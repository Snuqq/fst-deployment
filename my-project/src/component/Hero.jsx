import HeroImg from "../assets/hero_image.png";

const Hero = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
        <div className="flex flex-col justify-center items-start space-y-6">
          <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-2">
            RivanCyber
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            JOsh howr eow ehg iwoi erge rgew gwgwwgf re reg reg geerg htrht nb
            fdreggerg rgrege re er gre gr e erergrgeg er ge e eeg
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition mt-4">
            Enroll Now
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={HeroImg}
            alt="img"
            className="w-full max-w-xs md:max-w-md rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
