// pages/Home.jsx
function Home({ progress }) {
  return (
    <div className="page">
      <h1>Добро пожаловать в трекер технологий</h1>
      <p>Здесь вы отслеживаете изучение фреймворков, языков и инструментов.</p>
      <p>Текущий прогресс: {progress}%</p>
    </div>
  );
}

export default Home;