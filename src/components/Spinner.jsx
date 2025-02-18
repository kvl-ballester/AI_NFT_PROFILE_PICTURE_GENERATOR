import "./spinner.css";
export default function Spinner({ size = '40px', color = '#3498db' }) {
    return (
      <div className="spinner-container">
        <div
          className="spinner"
          style={{
            width: size,
            height: size,
            borderColor: `${color} transparent transparent transparent`,
          }}
        ></div>
      </div>
    );

}