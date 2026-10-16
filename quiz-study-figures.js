// Existing study illustration and independently reviewed Testmaster SVGs.
// SVG sources: linguistics_2016_B02, linguistics_2011_X33, linguistics_2016_A06.
// Match stable question labels rather than randomized positions. No network requests.
(function (global) {
  'use strict';
  const figures = [
  [
    "stress.html",
    "Trochaic Foot",
    "Foot Structure",
    "stress_study.html#s9",
    "<div class=\"quiz-foot-box\"><div class=\"quiz-foot-label\">Trochee (Trochaic)</div><div class=\"quiz-foot-tree\" role=\"img\" aria-label=\"Trochaic foot: Ft branches into strong S followed by weak W\">     Ft\n    /    \\\n   S      W\n  강      약</div><p><b>영어의 기본(default) foot</b><br>예: ˈHAP-py, ˈSIS-ter<br>S = strong, W = weak</p></div>"
  ],
  [
    "flapping_ox.html",
    "Flapping",
    "규칙 형식화",
    "flapping_study.html#rule",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 822\" width=\"300\" height=\"822\" role=\"img\" aria-labelledby=\"flapping-2016-b02-title flapping-2016-b02-desc\" font-family=\"sans-serif\" font-size=\"18\" fill=\"currentColor\"><title id=\"flapping-2016-b02-title\">Flapping: attic and attack; /d/ in ladder</title><desc id=\"flapping-2016-b02-desc\">Primary stress is marked with ˈ. In attic and ladder, the target stop is followed by a syllable without stress and is shown as [ɾ]. In attack, ˈ precedes the second syllable and the target remains a stop. Underlining pairs the input stop with its output. Secondary stress ˌ also blocks this flapping context. Earlier stress is not mandatory, and individual words may depart from this American English pattern.</desc><text x=\"150\" y=\"28\" text-anchor=\"middle\" font-weight=\"700\">Flapping: stress and the target</text><text x=\"150\" y=\"60\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">/t, d/ can become [ɾ]</text><text x=\"150\" y=\"88\" text-anchor=\"middle\">ˈ marks primary stress</text><rect x=\"12\" y=\"108\" width=\"276\" height=\"162\" rx=\"10\" fill=\"none\" stroke=\"currentColor\"/><text x=\"150\" y=\"136\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">attic</text><text x=\"150\" y=\"171\" text-anchor=\"middle\" font-size=\"22\">/ˈæ<tspan font-weight=\"700\" text-decoration=\"underline\">t</tspan>ɪk/ → [ˈæ<tspan font-weight=\"700\" text-decoration=\"underline\">ɾ</tspan>ɪk]</text><text x=\"150\" y=\"204\" text-anchor=\"middle\">stressed /æ/ → target /t/</text><text x=\"150\" y=\"232\" text-anchor=\"middle\">then unstressed /ɪ/</text><text x=\"150\" y=\"259\" text-anchor=\"middle\" font-weight=\"700\">/t/ becomes [ɾ]</text><rect x=\"12\" y=\"286\" width=\"276\" height=\"162\" rx=\"10\" fill=\"none\" stroke=\"currentColor\"/><text x=\"150\" y=\"314\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">ladder</text><text x=\"150\" y=\"349\" text-anchor=\"middle\" font-size=\"22\">/ˈlæ<tspan font-weight=\"700\" text-decoration=\"underline\">d</tspan>ɚ/ → [ˈlæ<tspan font-weight=\"700\" text-decoration=\"underline\">ɾ</tspan>ɚ]</text><text x=\"150\" y=\"382\" text-anchor=\"middle\">stressed /æ/ → target /d/</text><text x=\"150\" y=\"410\" text-anchor=\"middle\">then unstressed /ɚ/</text><text x=\"150\" y=\"437\" text-anchor=\"middle\" font-weight=\"700\">/d/ becomes [ɾ]</text><rect x=\"12\" y=\"464\" width=\"276\" height=\"162\" rx=\"10\" fill=\"none\" stroke=\"currentColor\"/><text x=\"150\" y=\"492\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">attack</text><text x=\"150\" y=\"527\" text-anchor=\"middle\" font-size=\"22\">/əˈ<tspan font-weight=\"700\" text-decoration=\"underline\">t</tspan>æk/ → [əˈ<tspan font-weight=\"700\" text-decoration=\"underline\">t</tspan>ʰæk]</text><text x=\"150\" y=\"560\" text-anchor=\"middle\">target /t/ before stressed /æ/</text><text x=\"150\" y=\"588\" text-anchor=\"middle\">Flap is blocked here</text><text x=\"150\" y=\"615\" text-anchor=\"middle\" font-weight=\"700\">No [ɾ] at that position</text><text x=\"150\" y=\"658\" text-anchor=\"middle\">Primary ˈ and secondary ˌ</text><text x=\"150\" y=\"684\" text-anchor=\"middle\">both count as stress.</text><text x=\"150\" y=\"714\" text-anchor=\"middle\">An earlier stress is not required.</text><text x=\"150\" y=\"743\" text-anchor=\"middle\">American English examples;</text><text x=\"150\" y=\"769\" text-anchor=\"middle\">lexical exceptions occur.</text><text x=\"150\" y=\"802\" text-anchor=\"middle\">ˈ 뒤의 syllable에 stress가 있다.</text></svg>"
  ],
  [
    "nasalization_ox.html",
    "Epenthesis",
    "복수 /ɪz/",
    "nasalization_epenthesis_study.html#epenthesis",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 470\" width=\"280\" height=\"470\" role=\"img\" aria-labelledby=\"insertion-2011-x33-title insertion-2011-x33-desc\" font-family=\"sans-serif\" font-size=\"17\" fill=\"currentColor\"><title id=\"insertion-2011-x33-title\">Plural forms with and without insertion</title><desc id=\"insertion-2011-x33-desc\">Adding plural /z/ to /kɪd/ gives [kɪdz], with no intervening vowel. Adding /z/ to /bʌs/ gives [bʌsəz], with an inserted [ə]. A transcription using [ɪ] is also possible. The comparison illustrates this plural pattern.</desc><text x=\"140\" y=\"28\" text-anchor=\"middle\" font-size=\"18\" font-weight=\"700\">Insertion: a new vowel</text><rect x=\"12\" y=\"48\" width=\"256\" height=\"150\" rx=\"10\" fill=\"none\" stroke=\"currentColor\"/><text x=\"140\" y=\"78\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">kids</text><text x=\"140\" y=\"107\" text-anchor=\"middle\" font-size=\"22\">/kɪd + z/</text><text x=\"140\" y=\"133\" text-anchor=\"middle\" font-size=\"22\">↓</text><text x=\"140\" y=\"160\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">[kɪdz]</text><text x=\"140\" y=\"185\" text-anchor=\"middle\">No added vowel</text><rect x=\"12\" y=\"216\" width=\"256\" height=\"150\" rx=\"10\" fill=\"none\" stroke=\"currentColor\"/><text x=\"140\" y=\"246\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">buses</text><text x=\"140\" y=\"275\" text-anchor=\"middle\" font-size=\"22\">/bʌs + z/</text><text x=\"140\" y=\"301\" text-anchor=\"middle\" font-size=\"22\">↓</text><text x=\"140\" y=\"328\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">[bʌsəz]</text><text x=\"140\" y=\"353\" text-anchor=\"middle\">Added [ə]</text><text x=\"140\" y=\"398\" text-anchor=\"middle\">One transcription shown;</text><text x=\"140\" y=\"424\" text-anchor=\"middle\">the vowel may also be [ɪ].</text><text x=\"140\" y=\"450\" text-anchor=\"middle\">For this plural pattern.</text></svg>"
  ],
  [
    "suffix_ox.html",
    "-y (photography)",
    "강세 이동 예시",
    "stress_study.html#s6",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 440\" width=\"280\" height=\"440\" role=\"img\" aria-labelledby=\"suffix-2016-a06-title suffix-2016-a06-desc\" font-family=\"sans-serif\" font-size=\"17\" fill=\"currentColor\"><title id=\"suffix-2016-a06-title\">Two effects of suffix -y on stress</title><desc id=\"suffix-2016-a06-desc\">Capital letters mark primary stress. Photograph has stress on its first syllable, but noun photography has stress on its second. Summer and adjective summery both have stress on their first syllable. These examples contrast stress-shifting and stress-neutral suffixes.</desc><text x=\"140\" y=\"27\" text-anchor=\"middle\" font-size=\"18\" font-weight=\"700\">Suffixes and primary stress</text><text x=\"140\" y=\"53\" text-anchor=\"middle\">CAPS show primary stress</text><rect x=\"12\" y=\"69\" width=\"256\" height=\"148\" rx=\"10\" fill=\"none\" stroke=\"currentColor\"/><text x=\"140\" y=\"96\" text-anchor=\"middle\">Noun-forming -y</text><text x=\"140\" y=\"127\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">PHOtograph</text><text x=\"140\" y=\"154\" text-anchor=\"middle\" font-size=\"22\">↓</text><text x=\"140\" y=\"184\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">phoTOGraphy</text><text x=\"140\" y=\"208\" text-anchor=\"middle\">stress-shifting</text><rect x=\"12\" y=\"237\" width=\"256\" height=\"148\" rx=\"10\" fill=\"none\" stroke=\"currentColor\"/><text x=\"140\" y=\"264\" text-anchor=\"middle\">Adjective-forming -y</text><text x=\"140\" y=\"295\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">SUMmer</text><text x=\"140\" y=\"322\" text-anchor=\"middle\" font-size=\"22\">↓</text><text x=\"140\" y=\"352\" text-anchor=\"middle\" font-size=\"22\" font-weight=\"700\">SUMmery</text><text x=\"140\" y=\"376\" text-anchor=\"middle\">stress-neutral</text><text x=\"140\" y=\"418\" text-anchor=\"middle\">Compare these two examples.</text></svg>"
  ]
];
  global.QuizStudyFigures = {
    render(q) {
      const page = global.location.pathname.split('/').pop();
      const figure = figures.find(item => item[0] === page && item[1] === q.src && item[2] === q.cat);
      if (!figure) return '';
      return '<details class="quiz-study-figure"><summary>그림으로 이해하기</summary>' +
        '<div class="quiz-study-figure-body">' + figure[4] + '</div>' +
        '<a class="quiz-study-figure-link" href="./' + figure[3] +
        '" target="_blank" rel="noopener">개념 정리에서 보기 ↗</a></details>';
    }
  };
})(window);
