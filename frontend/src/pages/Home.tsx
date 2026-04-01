import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import logo from '../assets/logo.svg';

const features = [
  {
    title: 'Length Conversion',
    description: 'Convert smoothly between Feet, Inches, Yards, and Centimeters with precision.',
    icon: '📏',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Weight Calculation',
    description: 'Transform Grams to Kilograms, Pounds, or Tonnes on the fly.',
    icon: '⚖️',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Temperature Checking',
    description: 'Accurately convert across Celsius, Fahrenheit, and Kelvin scales instantly.',
    icon: '🌡️',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    title: 'Volume Mathematics',
    description: 'Effortlessly switch between Litres, Millilitres, and Gallons for your liquid measures.',
    icon: '💧',
    color: 'bg-cyan-100 text-cyan-600',
  },
];

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col selection:bg-blue-100">
      {/* Header/Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to={ROUTES.HOME} className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
            <h2 className="text-2xl font-black text-blue-600 hidden sm:block">Quant-Ment</h2>
          </Link>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="text-slate-600 font-medium hidden md:block">Welcome back, {user.name}</span>
                <Button onClick={() => navigate(ROUTES.DASHBOARD)}>Go to Dashboard</Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="text-slate-600 font-semibold hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Button onClick={() => navigate(ROUTES.SIGNUP)}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content - Hero Section */}
      <main className="flex-grow flex flex-col">
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-5 overflow-hidden flex flex-col justify-center items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto mt-10 mb-16 animate-in slide-in-from-bottom-4 fade-in duration-700">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 border border-blue-200">
              The Ultimate Unit Converter
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
              Precision Measurement & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Conversion</span> Made Simple
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Instantly convert and calculate across Length, Weight, Temperature, and Volume. The unified tool designed for engineers, students, and everybody in between.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {user ? (
                <Button
                  variant="primary"
                  size="lg"
                  className="text-lg px-8 rounded-full shadow-blue-200/50 shadow-lg hover:shadow-blue-300/50 hover:-translate-y-0.5 transition-all"
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                >
                  Open Calculator
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    className="text-lg px-8 rounded-full shadow-blue-200/50 shadow-lg hover:shadow-blue-300/50 hover:-translate-y-0.5 transition-all"
                    onClick={() => navigate(ROUTES.LOGIN)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-lg px-8 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5 transition-all"
                    onClick={() => navigate(ROUTES.DASHBOARD)}
                  >
                    Try as Guest
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Supported Measurement Types</h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                No matter what system you're working with, Quant-Ment provides robust and flawless automated conversions for any formula.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Math Interface Preview (Decoration) */}
        <section className="py-16 bg-slate-50 overflow-hidden relative border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">Add & Subtract Dimensions Seamlessly</h2>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 max-w-2xl mx-auto flex flex-col gap-4 text-left">
               <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <div className="font-semibold text-slate-700">12 <span>INCHES</span></div>
                 <div className="text-blue-500 font-black">+</div>
                 <div className="font-semibold text-slate-700">1 <span>FEET</span></div>
               </div>
               <div className="flex justify-center py-2 text-2xl font-bold text-slate-400">=</div>
               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-center text-white shadow-md">
                 <span className="text-3xl font-black">24</span> <span className="font-bold opacity-90 tracking-wider">INCHES</span>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-12 pb-8 mt-auto">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-8 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Quant-Ment Logo" className="h-10 w-auto opacity-100" />
              <span className="text-2xl font-black text-white tracking-tight">Quant-Ment</span>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-slate-400 mb-1 font-medium text-sm uppercase tracking-wider">Developed By</div>
              <a 
                href="https://abhay-singh-lodhi.netlify.app/" 
                target="_blank" 
                rel="noreferrer"
                className="text-lg font-bold text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-sm"
              >
                Abhay Singh Lodhi
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <div>
              &copy; {new Date().getFullYear()} Quant-Ment Calculator. All rights reserved.
            </div>
            <div className="flex gap-6">
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
