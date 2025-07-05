import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Camera, Palette, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const apps = [
    {
      id: 'story-generator',
      title: 'Generatore di Storie',
      subtitle: 'Crea favole personalizzate della buonanotte',
      description: 'Genera storie magiche personalizzate per età, interessi e stile di scrittura',
      icon: BookOpen,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50',
      borderColor: 'border-indigo-200',
      features: ['6 stili di autore famosi', 'Personalizzazione completa', 'Lezioni morali integrate'],
      path: '/story-generator'
    },
    {
      id: 'character-sheet',
      title: 'Character Sheet Generator',
      subtitle: 'Crea personaggi coerenti per le illustrazioni',
      description: 'Genera un character sheet multiposa per mantenere coerenza visiva',
      icon: Camera,
      color: 'from-pink-500 to-orange-500',
      bgColor: 'from-pink-50 to-orange-50',
      borderColor: 'border-pink-200',
      features: ['Multiple pose del personaggio', '6 stili artistici', 'Prompt per AI ottimizzati'],
      path: '/character-sheet'
    },
    {
      id: 'illustrations',
      title: 'Generatore Illustrazioni',
      subtitle: 'Trasforma le storie in immagini sequence',
      description: 'Crea prompt dettagliati per illustrazioni coerenti della tua favola',
      icon: Palette,
      color: 'from-emerald-500 to-cyan-500',
      bgColor: 'from-emerald-50 to-cyan-50',
      borderColor: 'border-emerald-200',
      features: ['Analisi automatica della storia', 'Illustrazioni coerenti', 'Export prompt per AI'],
      path: '/illustrations'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Favole Toolkit
          </h1>
          <Sparkles className="w-12 h-12 text-purple-500 animate-pulse" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Il toolkit completo per creare storie illustrate magiche per bambini. 
          Dalla generazione del testo alle illustrazioni finali, tutto in un unico posto! ✨
        </p>
      </div>

      {/* Workflow Guide */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-2 border-purple-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🎯 Workflow Consigliato
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">1</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Crea la Storia</h3>
            <p className="text-gray-600 text-sm">Genera una favola personalizzata con il Generatore di Storie</p>
          </div>
          <div className="text-center">
            <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">2</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Character Sheet</h3>
            <p className="text-gray-600 text-sm">Crea un personaggio di riferimento per coerenza visiva</p>
          </div>
          <div className="text-center">
            <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-emerald-600">3</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Illustrazioni</h3>
            <p className="text-gray-600 text-sm">Genera prompt per illustrazioni coerenti della storia</p>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {apps.map((app) => {
          const IconComponent = app.icon;
          return (
            <div
              key={app.id}
              className={`bg-gradient-to-br ${app.bgColor} rounded-3xl shadow-2xl overflow-hidden border-2 ${app.borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl`}
            >
              <div className={`bg-gradient-to-r ${app.color} p-6`}>
                <div className="text-center text-white">
                  <IconComponent className="w-12 h-12 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold mb-2">{app.title}</h2>
                  <p className="text-sm opacity-90">{app.subtitle}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 text-center mb-6 leading-relaxed">
                  {app.description}
                </p>

                <div className="space-y-3 mb-6">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate(app.path)}
                  className={`w-full bg-gradient-to-r ${app.color} hover:opacity-90 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg`}
                >
                  Inizia
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="text-center mt-16 text-gray-500">
        <p className="text-sm">
          ✨ Ogni strumento è progettato per lavorare insieme agli altri per creare storie illustrate complete
        </p>
      </div>
    </div>
  );
};

export default Home;