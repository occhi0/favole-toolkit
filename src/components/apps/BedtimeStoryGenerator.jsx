import React, { useState } from 'react';
import { Sparkles, Book, ArrowRight, ArrowLeft, Loader2, Heart, Star, Moon, Copy, Check } from 'lucide-react';

const BedtimeStoryGenerator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    interests: [],
    style: '',
    authorStyle: '',
    lesson: ''
  });

  const interests = [
    'Animali', 'Spazio e Stelle', 'Oceano e Vita Marina', 'Dinosauri', 
    'Magia e Fantasia', 'Sport', 'Musica', 'Arte e Disegno', 
    'Natura e Bosco', 'Supereroi', 'Veicoli e Trasporti', 
    'Cucina e Cibo', 'Scienza ed Esperimenti'
  ];

  const styles = [
    { value: 'funny', label: 'Divertente e Buffa', emoji: '😄', desc: 'Risate e giochi durante tutta la storia' },
    { value: 'adventurous', label: 'Avventurosa ed Emozionante', emoji: '🌟', desc: 'Missioni entusiasmanti e scoperte' },
    { value: 'gentle', label: 'Dolce e Rilassante', emoji: '🌙', desc: 'Pacifica e rassicurante' },
    { value: 'magical', label: 'Magica e Incantevole', emoji: '✨', desc: 'Fantasia e meraviglia' },
    { value: 'educational', label: 'Educativa e Istruttiva', emoji: '📚', desc: 'Fatti divertenti e conoscenza' }
  ];

  const authorStyles = [
    { value: 'roald-dahl', label: 'Roald Dahl', desc: 'Storie bizzarre e divertenti con personaggi eccentrici' },
    { value: 'dr-seuss', label: 'Dr. Seuss', desc: 'Rime giocose e creature fantastiche' },
    { value: 'beatrix-potter', label: 'Beatrix Potter', desc: 'Dolci avventure di animali nella natura' },
    { value: 'julia-donaldson', label: 'Julia Donaldson', desc: 'Storie in rima con morale e amicizia' },
    { value: 'eric-carle', label: 'Eric Carle', desc: 'Semplici e colorati con focus sulla natura' },
    { value: 'maurice-sendak', label: 'Maurice Sendak', desc: 'Avventure selvagge e immaginative' },
    { value: 'gianni-rodari', label: 'Gianni Rodari', desc: 'Fantasie italiane piene di umorismo e creatività' },
    { value: 'astrid-lindgren', label: 'Astrid Lindgren', desc: 'Avventure coraggiose di bambini indipendenti' }
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const copyStory = async () => {
    try {
      await navigator.clipboard.writeText(storyText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Errore nella copia:', err);
      // Fallback per browser che non supportano la clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = storyText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const generateStory = async () => {
    setIsGenerating(true);
    setCurrentStep(6);

    try {
      const selectedAuthor = authorStyles.find(a => a.value === formData.authorStyle);
      
      // Prompt più specifico per ogni autore
      const getAuthorSpecificPrompt = (authorValue) => {
        switch (authorValue) {
          case 'roald-dahl':
            return `Scrivi come Roald Dahl: usa un linguaggio vivace e descrittivo, personaggi eccentrici con nomi divertenti, situazioni assurde ma logiche, un pizzico di ribellione contro le regole degli adulti, e descrizioni dettagliate che fanno ridere. Include parole inventate occasionali e un tono malizioso ma affettuoso.`;
          
          case 'dr-seuss':
            return `Scrivi come Dr. Seuss: usa rime semplici e ripetitive, parole inventate che suonano divertenti, frasi corte e ritmiche, personaggi dalle forme strane e colori vivaci. Ripeti suoni e pattern linguistici, mantieni un ritmo musicale e giocoso.`;
          
          case 'beatrix-potter':
            return `Scrivi come Beatrix Potter: usa un linguaggio elegante ma semplice, animali che si comportano come persone educate, descrizioni dettagliate di case accoglienti e giardini, un tono gentile e rassicurante, riferimenti alla campagna inglese e alle buone maniere.`;
          
          case 'julia-donaldson':
            return `Scrivi come Julia Donaldson: crea rime che fluiscono naturalmente, personaggi che aiutano gli amici, avventure che insegnano l'importanza dell'amicizia e della collaborazione, ripetizioni che i bambini possono memorizzare facilmente, finali che premiano la gentilezza.`;
          
          case 'eric-carle':
            return `Scrivi come Eric Carle: usa frasi semplici e ripetitive, focus su animali e natura, descrizioni di colori vivaci e texture, pattern che si ripetono (lunedì, martedì...), crescita e trasformazione come temi centrali, linguaggio che invita i bambini a partecipare.`;
          
          case 'maurice-sendak':
            return `Scrivi come Maurice Sendak: esplora le emozioni intense dei bambini (rabbia, paura, gioia), crea mondi fantastici dove i bambini hanno il potere, usa un linguaggio poetico e evocativo, non temere di toccare sentimenti "difficili" ma risolvi tutto con amore e comprensione.`;
          
          case 'gianni-rodari':
            return `Scrivi come Gianni Rodari: gioca con le parole e i loro significati, crea situazioni paradossali e surreali, usa l'umorismo intelligente, rovescia le aspettative (e se...?), include elementi di fantasia quotidiana, mantieni un'ironia gentile e stimolante.`;
          
          case 'astrid-lindgren':
            return `Scrivi come Astrid Lindgren: crea protagonisti bambini coraggiosi e indipendenti, situazioni avventurose ma realistiche, dialoghi naturali e divertenti, celebra la libertà e l'immaginazione infantile, includi piccole trasgressioni innocenti, mantieni un tono ottimista e rispettoso dei bambini.`;
          
          default:
            return `Scrivi in modo coinvolgente per bambini.`;
        }
      };

      const prompt = `${getAuthorSpecificPrompt(formData.authorStyle)}

Crea una storia della buonanotte per un ${formData.gender} di ${formData.age} anni che ama ${formData.interests.join(', ')}.

STILE RICHIESTO: ${formData.style} + ${selectedAuthor?.label}

LEZIONE DA INCLUDERE: ${formData.lesson}

LINEE GUIDA:
- Lunghezza: 300-500 parole
- Finale rilassante adatto alla buonanotte
- Età appropriata: ${formData.age} anni
- Incorpora gli interessi: ${formData.interests.join(', ')}
- Integra naturalmente la lezione morale

IMPORTANTE: Scrivi SOLO la storia, senza titolo o formattazione aggiuntiva. Segui fedelmente lo stile di ${selectedAuthor?.label} nelle scelte linguistiche, nel ritmo e nell'approccio narrativo.`;

      const response = await window.claude.complete(prompt);
      setStoryText(response);
      setCurrentStep(7);
    } catch (error) {
      console.error('Errore nella generazione della storia:', error);
      alert('Mi dispiace, c\'è stato un errore nella generazione della storia. Riprova.');
      setCurrentStep(5);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setStoryText('');
    setIsGenerating(false);
    setIsCopied(false);
    setFormData({
      age: '',
      gender: '',
      interests: [],
      style: '',
      authorStyle: '',
      lesson: ''
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.age !== '';
      case 1: return formData.gender !== '';
      case 2: return formData.interests.length > 0;
      case 3: return formData.style !== '';
      case 4: return formData.authorStyle !== '';
      case 5: return formData.lesson.trim() !== '';
      default: return true;
    }
  };

  const getStepInfo = () => {
    const steps = [
      { title: 'Quanti anni ha il tuo piccolo?', subtitle: 'Questo ci aiuta a scegliere il vocabolario e i temi perfetti', progress: 17 },
      { title: 'Parlaci del tuo bambino', subtitle: 'Useremo i pronomi e la prospettiva corretti', progress: 33 },
      { title: 'Cosa ama il tuo bambino?', subtitle: 'Scegli 1-3 cose che accendono la sua immaginazione', progress: 50 },
      { title: 'Che tipo di storia vorresti?', subtitle: 'Scegli il tono che si adatta meglio alla buonanotte', progress: 67 },
      { title: 'Scegli uno stile di autore', subtitle: 'Quale autore famoso dovrebbe ispirare la storia?', progress: 83 },
      { title: 'Quale lezione dovremmo includere?', subtitle: 'Quale messaggio importante dovrebbero imparare?', progress: 100 },
      { title: 'Creando la tua storia magica...', subtitle: 'La nostra magia narrativa è al lavoro...', progress: 100 },
      { title: 'La tua storia della buonanotte è pronta!', subtitle: 'I sogni dolci sono a portata di storia!', progress: 100 }
    ];
    return steps[currentStep] || steps[0];
  };

  const stepInfo = getStepInfo();

  // Step 0: Età
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-12 h-12 text-indigo-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{stepInfo.title}</h1>
            <p className="text-gray-600">{stepInfo.subtitle}</p>
          </div>

          <div className="space-y-6">
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="Inserisci età (2-12)"
              min="2"
              max="12"
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-colors text-2xl text-center font-bold"
              autoFocus
            />

            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              Continua
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">Passo 1 di 6</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{width: `${stepInfo.progress}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Genere
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-purple-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{stepInfo.title}</h1>
            <p className="text-gray-600">{stepInfo.subtitle}</p>
          </div>

          <div className="space-y-4">
            {[
              { value: 'bambino', label: 'Bambino' },
              { value: 'bambina', label: 'Bambina' },
              { value: 'altro', label: 'Altro' }
            ].map((gender) => (
              <button
                key={gender.value}
                onClick={() => setFormData({...formData, gender: gender.value})}
                className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-200 text-center font-bold text-lg ${
                  formData.gender === gender.value
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {gender.label}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continua
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">Passo 2 di 6</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{width: `${stepInfo.progress}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Interessi
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Star className="w-12 h-12 text-pink-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{stepInfo.title}</h1>
            <p className="text-gray-600">{stepInfo.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`py-3 px-4 rounded-xl border-2 transition-all duration-200 text-center font-medium text-sm ${
                  formData.interests.includes(interest)
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continua
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">Passo 3 di 6</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{width: `${stepInfo.progress}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Stile
  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Book className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{stepInfo.title}</h1>
            <p className="text-gray-600">{stepInfo.subtitle}</p>
          </div>

          <div className="space-y-3 mb-8">
            {styles.map((style) => (
              <button
                key={style.value}
                onClick={() => setFormData({...formData, style: style.value})}
                className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-200 text-left font-medium flex items-center gap-4 ${
                  formData.style === style.value
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl">{style.emoji}</span>
                <div>
                  <div className="font-bold">{style.label}</div>
                  <div className="text-sm opacity-70">{style.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continua
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">Passo 4 di 6</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{width: `${stepInfo.progress}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Stile Autore
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Book className="w-12 h-12 text-emerald-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{stepInfo.title}</h1>
            <p className="text-gray-600">{stepInfo.subtitle}</p>
          </div>

          <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
            {authorStyles.map((author) => (
              <button
                key={author.value}
                onClick={() => setFormData({...formData, authorStyle: author.value})}
                className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-200 text-left font-medium ${
                  formData.authorStyle === author.value
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="font-bold text-lg">{author.label}</div>
                <div className="text-sm opacity-70 mt-1">{author.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continua
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">Passo 5 di 6</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{width: `${stepInfo.progress}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Lezione
  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{stepInfo.title}</h1>
            <p className="text-gray-600">{stepInfo.subtitle}</p>
          </div>

          <div className="space-y-6">
            <textarea
              value={formData.lesson}
              onChange={(e) => setFormData({...formData, lesson: e.target.value})}
              placeholder="Esempi: Essere gentili con gli altri, provare cose nuove, condividere è importante, essere coraggiosi quando si ha paura..."
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-colors resize-none h-32 text-lg"
              autoFocus
            />

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Indietro
              </button>
              <button
                onClick={generateStory}
                disabled={!canProceed()}
                className="flex-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Crea Storia
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-sm text-gray-500">Passo 6 di 6</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{width: `${stepInfo.progress}%`}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 6: Caricamento
  if (currentStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
          <div className="animate-pulse mb-6">
            <Moon className="w-16 h-16 text-indigo-400 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{stepInfo.title}</h2>
          <p className="text-gray-600 mb-6">{stepInfo.subtitle}</p>
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // Step 7: Visualizzazione Storia
  if (currentStep === 7) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                  <Book className="w-8 h-8" />
                  {stepInfo.title}
                </h1>
                <p className="text-indigo-100">{stepInfo.subtitle}</p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="prose prose-lg max-w-none mb-8">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-orange-300">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg font-serif">
                    {storyText || "C'era una volta una meravigliosa storia che aspettava di essere raccontata..."}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 text-indigo-500 mb-4">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-medium">Sogni d'oro!</span>
                  <Star className="w-5 h-5" />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={copyStory}
                    className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-3 ${
                      isCopied 
                        ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copiato!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copia Storia
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    Nuova Storia
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BedtimeStoryGenerator;