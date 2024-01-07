import "./Loader.css";
export default function CustomLoader() {
  return (
    <main>
      <div className="loader">
        <div className="loader-inner line-scale">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
