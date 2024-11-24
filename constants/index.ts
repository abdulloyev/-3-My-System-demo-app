export const lessons = [
  {
    id: "qwe12dfsf",
    questions: [
      {
        id: "q1",
        question: "Delfin javonning eng tepasida joylashganmi?",
        answer: [
          {
            id: "q1a1",
            answer: "Yo'q",
            isCorrect: true,
          },
          {
            id: "q1a2",
            answer: "Ha",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q2",
        question: "Timsoh javonning eng pastki tokchasida joylashganmi?",
        answer: [
          {
            id: "q2a1",
            answer: "Ha",
            isCorrect: true,
          },
          {
            id: "q2a2",
            answer: "Yo'q",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q3",
        question: "Pingvinchalar javonning 2- tokchasida joylashganmi?",
        answer: [
          {
            id: "q3a1",
            answer: "Yo'q",
            isCorrect: true,
          },
          {
            id: "q3a2",
            answer: "Ha",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q4",
        question: "Yo'lbars javonning pastki tokchasida joylashganmi?",
        answer: [
          {
            id: "q4a1",
            answer: "Ha",
            isCorrect: true,
          },
          {
            id: "q4a2",
            answer: "Yo'q",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q5",
        question: "O'rdakchali qayiqcha javonning ustida joylashganmi?",
        answer: [
          {
            id: "q5a1",
            answer: "Yo'q",
            isCorrect: true,
          },
          {
            id: "q5a2",
            answer: "Ha",
            isCorrect: false,
          },
        ],
      },
      {
        id: "q6",
        question: "Pingvinchalar javonning yuqori tokchasida joylashganmi?",
        answer: [
          {
            id: "q6a1",
            answer: "Ha",
            isCorrect: true,
          },
          {
            id: "q6a2",
            answer: "Yo'q",
            isCorrect: false,
          },
        ],
      },
    ],
    video: "https://www.youtube.com/embed/QiSEgUEEbF8",
    title: "TOMONLAR VA YO’NALISHLAR (TEPA - PAST)",
    quizImg: ["/img/lesson1_01.png"],
    description:
      "Next.js is an open-source web development framework based on React and has gained significant popularity due to its amazing features. It is developed by Vercel and Next.js stands out for its robust capabilities, including server-side rendering(SSR) and enhanced search engine optimization (SEO). Next.js provides built-in routing, making it simple to create dynamic routes and handle navigation within your application.",
    image: {
      url: "/img/lesson1_01.png",
    },
    content: {
      html: '<p><strong>Next.js</strong></p><p> - bu </p><p>React-ga asoslangan ochiq manbali veb-ishlab chiqish tizimi va ajoyib xususiyatlari tufayli sezilarli mashhurlikka erishdi. U Vercel tomonidan ishlab chiqilgan va Next.js o&#39;zining mustahkam </p><p><strong>imkoniyatlari</strong></p><p> , jumladan </p><p><strong>server tomonida ko&#39;rsatish (SSR)</strong></p><p> va kengaytirilgan </p><p><strong>qidiruv tizimini optimallashtirish (SEO) bilan</strong></p><p> ajralib turadi . Next.js o‘rnatilgan marshrutlashni ta’minlaydi, bu dinamik marshrutlarni yaratish va ilovangiz ichida navigatsiyani boshqarishni osonlashtiradi.</p><p></p><p>Ushbu </p><p><strong>Next.js qoʻllanmasida biz </strong></p><p><strong>marshrutlash, maʼlumotlarni olish, atrof-muhit oʻzgaruvchilari, meta teglar, statik fayllarga xizmat koʻrsatish, oldindan koʻrsatish va hokazo</strong></p><p> kabi barcha asosiy va ilgʻor tushunchalarni oʻrganamiz.</p><p></p><img src="https://us-east-1-shared-usea1-02.graphassets.com/clwwefkxn1ihq07jw6cly4rmp/output=format:webp/resize=width:1000,height:500/clxsskx7f06hz07ldvw5kl1s4" alt="NEXT-js-tutorial-1.png" title="NEXT-js-tutorial-1.png" width="1000" height="500" /><h2><strong>Next.js-ni o&#39;rganish uchun zarur shartlar</strong></h2><p><strong>NextJS-ni o&#39;rganishni boshlashdan oldin siz JavaScript-dan React-ga</strong> qanday o&#39;tganimiz haqida asosiy ma&#39;lumotga ega bo&#39;lishingiz kerak , shundan so&#39;ng siz <strong>React-dan NextJS-ga</strong> o&#39;tishingiz mumkin . Shunday qilib, sizga <a target=\'_blank\' title="https://www.geeksforgeeks.org/html/" href="https://www.geeksforgeeks.org/html/"><strong>HTML</strong></a> , <a target=\'_blank\' title="https://www.geeksforgeeks.org/css/" href="https://www.geeksforgeeks.org/css/"><strong>CSS</strong></a> , <a title="https://www.geeksforgeeks.org/javascript/" href="https://www.geeksforgeeks.org/javascript/"><strong>Javascript</strong></a> va <a target=\'_blank\' title="https://www.geeksforgeeks.org/reactjs-tutorials/" href="https://www.geeksforgeeks.org/reactjs-tutorials/"><strong>React</strong></a> bo&#39;yicha asosiy bilim kerak bo&#39;ladi .</p><h2>Nima uchun Next.js-ni o&#39;rganish kerak?</h2><p>Next.js an&#39;anaviy React ishlanmalariga nisbatan bir qancha afzalliklarni taklif etadi:</p><ol><li><div><strong>O&#39;rnatilgan marshrutlash va SSR</strong> : Mahalliy marshrutlashdan mahrum bo&#39;lgan Reactdan farqli o&#39;laroq, Next.js qutidan tashqarida uzluksiz marshrutlash funksiyasini ta&#39;minlaydi. Bundan tashqari, u server tomonida renderlashni qo&#39;llab-quvvatlaydi, unumdorlikni va SEOni yaxshilaydi.</div></li><li><div><strong>Tezroq rivojlanish</strong> : Next.js o&#39;rnatilgan funksiyalar va konventsiyalarni taklif qilish orqali rivojlanishni tezlashtiradi. Ishlab chiquvchilar murakkab sozlamalarni sozlashdan ko&#39;ra, xususiyatlarni yaratishga e&#39;tibor berishlari mumkin.</div></li><li><div><strong>SEO optimallashtirish</strong> : Next.js mijoz tomonidan renderlash bilan bog&#39;liq sekin ko&#39;rsatish va yuklash vaqtlarini ko&#39;rib chiqish orqali SEOni yaxshilaydi. Uning SSR imkoniyatlari qidiruv tizimlarining kontentingizni samarali tekshirishi va indekslashini ta&#39;minlaydi.</div></li></ol><p><strong>Bundan tashqari</strong> , NextJS mijoz tomonidan ko&#39;rsatishga xos bo&#39;lgan sekin ko&#39;rsatish va yuklash vaqtlarini kamaytiradi, bu SEO ish faoliyatini optimallashtirish uchun juda muhimdir. Uning server tomonidagi renderlashning integratsiyasi umumiy rivojlanish samaradorligini va foydalanuvchi tajribasini oshiradi.</p><p>Ushbu imtiyozlar Next.js-ni ko&#39;plab ishlab chiquvchilar uchun ReactJS-ga nisbatan jozibali tanlovga aylantiradi.</p><p></p>',
    },
    slug: "lesson1",
  },
];
