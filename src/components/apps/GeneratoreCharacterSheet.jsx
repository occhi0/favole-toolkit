import React, { useState } from 'react';
import { Camera, Sparkles, Copy, RefreshCw, BookOpen, Palette, Eye, Check } from 'lucide-react';

const GeneratoreCharacterSheet = () => {
  const [testoFavola, setTestoFavola] = useState('');
  const [stileArtistico, setStileArtistico] = useState('');
  const [staGenerando, setStaGenerando] = useState(false);
  const [promptGenerato, setPromptGenerato] = useState('');
  const [analisiPersonaggio, setAnalisiPersonaggio] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const stiliArtistici = [
    {
      nome: 'Illustrazione per Bambini Classica',
      valore: 'children_book_classic',
      descrizione: 'Stile tradizionale con colori vivaci e tratti morbidi, come Eric Carle',
      emoji: '📚'
    },
    {
      nome: 'Acquerello Dolce',
      valore: 'watercolor_soft',
      descrizione: 'Acquerelli delicati con sfumature pastello',
      emoji: '🎨'
    },
    {
      nome: 'Cartoon Divertente',
      valore: 'cartoon_fun',
      descrizione: 'Stile cartone animato allegro come Disney/Pixar',
      emoji: '😄'
    },
    {
      nome: 'Fantasy Magico',
      valore: 'fantasy_magical',
      descrizione: 'Illustrazioni fantastiche con elementi magici',
      emoji: '✨'
    },
    {
      nome: 'Natura Realistica',
      valore: 'nature_realistic',
      descrizione: 'Animali e natura in stile semi-realistico',
      emoji: '🌿'
    },
    {
      nome: 'Digitale Moderno',
      valore: 'digital_modern',
      descrizione: 'Illustrazione digitale contemporanea e pulita',
      emoji: '💻'
    }
  ];

  const generaCharacterSheet = async () => {
    if (!testoFavola.trim() || !stileArtistico) {
      alert('Per favore inserisci la favola e scegli uno stile artistico.');
      return;
    }

    setStaGenerando(true);

    try {
      const stileSelezionato = stiliArtistici.find(s => s.valore === stileArtistico);

      const prompt = `Analizza questa favola per bambini e crea un prompt per character sheet del personaggio principale:

FAVOLA:
"${testoFavola}"

STILE RICHIESTO: ${stileSelezionato.descrizione}

Crea un prompt dettagliato in inglese per generare un character sheet che mostri il personaggio principale in 4 pose diverse (fronte, profilo, 3/4, espressione felice) per garantire coerenza nelle illustrazioni successive.

Il prompt deve essere ottimizzato per AI come DALL-E o Midjourney e includere:
- Descrizione fisica dettagliata del personaggio
- Stile artistico specifico
- Indicazione che è un character sheet
- Dettagli su pose e angolazioni
- Colori e atmosfera della storia

Rispondi SOLO con un oggetto JSON valido. NON includere markdown o altri testi. Solo JSON puro:
{
  "analisiPersonaggio": "breve analisi in italiano del personaggio principale",
  "promptCharacterSheet": "prompt dettagliato in inglese per il character sheet",
  "suggerimentiUso": "consigli per usare il character sheet nelle illustrazioni successive"
}`;

      console.log('Invio prompt a Claude...');
      const risposta = await window.claude.complete(prompt);
      console.log('Risposta ricevuta:', risposta);
      
      // Pulisci la risposta da eventuali markdown o testo extra
      let rispostaPulita = risposta.trim();
      
      // Rimuovi eventuali backticks markdown
      if (rispostaPulita.startsWith('```json')) {
        rispostaPulita = rispostaPulita.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (rispostaPulita.startsWith('```')) {
        rispostaPulita = rispostaPulita.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Trova l'inizio e la fine del JSON
      const inizioJson = rispostaPulita.indexOf('{');
      const fineJson = rispostaPulita.lastIndexOf('}');
      
      if (inizioJson !== -1 && fineJson !== -1) {
        rispostaPulita = rispostaPulita.substring(inizioJson, fineJson + 1);
      }
      
      console.log('Risposta pulita:', rispostaPulita);
      
      const dati = JSON.parse(rispostaPulita);
      console.log('Dati parsati:', dati);

      setAnalisiPersonaggio(dati.analisiPersonaggio || 'Analisi non disponibile');
      setPromptGenerato(dati.promptCharacterSheet || 'Prompt non generato');

    } catch (errore) {
      console.error('Errore completo:', errore);
      console.error('Stack trace:', errore.stack);
      alert(`Errore nella generazione: ${errore.message}. Controlla la console per maggiori dettagli.`);
    } finally {
      setStaGenerando(false);
    }
  };

  const copiaPrompt = async () => {
    if (promptGenerato) {
      try {
        await navigator.clipboard.writeText(promptGenerato);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Errore nella copia:', err);
        // Fallback per browser che non supportano la clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = promptGenerato;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  const reset = () => {
    setPromptGenerato('');
    setAnalisiPersonaggio('');
    setTestoFavola('');
    setStileArtistico('');
    setIsCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
            <div className="text-center text-white">
              <div className="flex justify-center items-center gap-3 mb-4">
                <Camera className="w-10 h-10 animate-pulse" />
                <h1 className="text-3xl font-bold">Generatore Character Sheet Multiposa</h1>
                <Sparkles className="w-10 h-10 animate-pulse" />
              </div>
              <p className="text-blue-100 text-lg">Crea un personaggio di riferimento per illustrazioni coerenti! 🎨</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Input Favola */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-500" />
                Testo della Favola:
              </label>
              <textarea
                value={testoFavola}
                onChange={(e) => setTestoFavola(e.target.value)}
                placeholder="Incolla qui il testo completo della tua favola..."
                className="w-full h-48 px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors resize-none text-lg"
                autoFocus
              />
              <button
                onClick={() => setTestoFavola("C'era una volta un piccolo coniglietto di nome Luca che viveva in un prato verde pieno di margherite. Luca aveva delle orecchie lunghe e soffici e un pelo bianco come la neve. Un giorno, mentre saltellava tra i fiori, incontrò una farfalla colorata che non riusciva a volare perché aveva un'ala rotta. Luca decise di aiutarla, la portò dal saggio gufo del bosco che le curò l'ala con delle foglie magiche. La farfalla, grata, regalò a Luca un fiore speciale che brillava di luce dorata. Da quel giorno Luca imparò che aiutare gli altri porta sempre gioia e magia nella vita.")}
                className="mt-2 text-sm bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded-lg transition-colors"
              >
                📝 Usa favola di esempio
              </button>
            </div>

            {/* Selezione Stile */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-6 h-6 text-pink-500" />
                Stile Artistico:
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {stiliArtistici.map((stile) => (
                  <button
                    key={stile.valore}
                    onClick={() => setStileArtistico(stile.valore)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      stileArtistico === stile.valore
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{stile.emoji}</span>
                      <div>
                        <div className="font-bold">{stile.nome}</div>
                        <div className="text-sm opacity-70">{stile.descrizione}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pulsante Genera */}
            <button
              onClick={generaCharacterSheet}
              disabled={!testoFavola.trim() || !stileArtistico || staGenerando}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
            >
              {staGenerando ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  Generando Character Sheet...
                </>
              ) : (
                <>
                  <Camera className="w-6 h-6" />
                  Genera Character Sheet Multiposa
                  <Sparkles className="w-6 h-6" />
                </>
              )}
            </button>

            {/* Risultati */}
            {promptGenerato && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-green-500" />
                    Analisi del Personaggio
                  </h3>
                  <p className="text-gray-700 bg-white rounded-xl p-4 border italic">
                    {analisiPersonaggio}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Camera className="w-6 h-6 text-purple-500" />
                      Prompt Character Sheet (Inglese)
                    </h3>
                    <button
                      onClick={copiaPrompt}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                        isCopied 
                          ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                          : 'bg-purple-500 hover:bg-purple-600 text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copiato!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copia Prompt
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-gray-800 text-green-400 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    {promptGenerato}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-orange-400">
                  <h4 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    Come Usare il Character Sheet:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li><strong>Copia il prompt</strong> e usalo con DALL-E, Midjourney o Stable Diffusion</li>
                    <li><strong>Genera l'immagine</strong> del character sheet con viste multiple</li>
                    <li><strong>Salva l'immagine</strong> come riferimento principale</li>
                    <li><strong>Usa questa immagine</strong> come riferimento per tutte le illustrazioni della storia</li>
                    <li><strong>Per Midjourney</strong>: Usa --cref con l'immagine del character sheet</li>
                    <li><strong>Per DALL-E</strong>: Carica l'immagine come riferimento insieme ai prompt delle scene</li>
                  </ol>
                </div>

                <button
                  onClick={reset}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl font-medium transition-all duration-200"
                >
                  🔄 Crea Nuovo Character Sheet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratoreCharacterSheet;