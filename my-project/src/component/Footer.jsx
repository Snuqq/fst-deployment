import React from 'react'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full px-5 bg-gray-600 flex flex-wrap justify-between text-white">
    <div>
    <h1 className="font-bold">RivanCyber</h1>
        <img src="" alt="logo" />
    </div>
    <div className="flex flex-col">
        <span className="font-bold">Page</span>
        <a href="#">Home</a>
        <a href="#">About</a>
    </div>
    <div>
        <span className="font-bold">Contact Us</span>
        <p>Number: 09342123</p>
        <p>Email: example@gmail.com</p>
        <p></p>
    </div>
    </footer>
  )
}

export default Footer