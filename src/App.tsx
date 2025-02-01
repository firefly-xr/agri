import React, { useState } from 'react';
import { Plane as Plant, Droplet, Thermometer, Sun, Wind, AlertTriangle } from 'lucide-react';

function CircularProgress({ value, color }: { value: number; color: string }) {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-48 h-48">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="96"
          cy="96"
        />
        <circle
          className={`${color}`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="96"
          cy="96"
        />
      </svg>
      <span className="absolute text-3xl font-bold">{value}%</span>
    </div>
  );
}

function HealthIndicator({ level, label, icon: Icon }: { level: number; label: string; icon: any }) {
  const getColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center">
      <Icon className="w-8 h-8 mb-2 text-white/80" />
      <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
      <div className={`w-full h-2 rounded-full bg-gray-700`}>
        <div
          className={`h-full rounded-full ${getColor(level)} transition-all duration-500`}
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="mt-2 text-white/80">{level}%</span>
    </div>
  );
}

function App() {
  const [plantHealth] = useState(85);
  const [moisture] = useState(65);
  const [temperature] = useState(90);
  const [sunlight] = useState(75);
  const [airQuality] = useState(45);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Agricultural Monitoring System</h1>
            <p className="text-white/80 mt-2">Real-time plant health and environmental metrics</p>
          </div>
          <div className="flex items-center gap-2 bg-red-500/20 text-white px-4 py-2 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span>Air Quality Alert</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Overall Plant Health</h2>
            <CircularProgress value={plantHealth} color="text-green-500" />
            <div className="mt-4 text-white/80 text-center">
              <p>Plant vitality is optimal</p>
              <p className="text-sm">Last updated: 5 minutes ago</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <HealthIndicator level={moisture} label="Moisture Level" icon={Droplet} />
            <HealthIndicator level={temperature} label="Temperature" icon={Thermometer} />
            <HealthIndicator level={sunlight} label="Sunlight" icon={Sun} />
            <HealthIndicator level={airQuality} label="Air Quality" icon={Wind} />
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">System Recommendations</h2>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-center gap-2">
              <Plant className="w-5 h-5" />
              Nutrient levels are within optimal range
            </li>
            <li className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Consider improving ventilation to increase air quality
            </li>
            <li className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-green-500" />
              Sunlight exposure is adequate for current growth phase
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;