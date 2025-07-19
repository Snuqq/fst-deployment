from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=255)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=255)
    description = models.TextField()
    countInStock = models.IntegerField()
    image = models.ImageField(upload_to='product_images/')
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product_name


class CartUser(models.Model):
    cart_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    qty = models.IntegerField()

    def __str__(self):
        return f'{self.user.username} - {self.product.product_name} x {self.qty}'


class PaymenMethod(models.Model):
    payment_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateField(null=True, blank=True)
    paymongo_payment_id = models.CharField(max_length=255, null=True, blank=True)
    paymongo_status = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'Payment #{self.payment_id} - {self.user.username}'


class OrderItem(models.Model):
    order_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    payment = models.ForeignKey(PaymenMethod, on_delete=models.SET_NULL, null=True)
    qty = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Order #{self.order_id} - {self.product.product_name}'


class ShippingAddress(models.Model):
    shipping_id = models.AutoField(primary_key=True)
    payment = models.ForeignKey(PaymenMethod, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.full_name} - {self.address}'