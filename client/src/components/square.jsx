export default function Square({ value, onClick }) {
    return (
      <button
        className="square"
        onClick={onClick}
        style={{
          width: '80px',
          height: '80px',
          fontSize: '32px',
          margin: '5px',
          cursor: 'pointer',
        }}
      >
        {value}
      </button>
    );
  }
  