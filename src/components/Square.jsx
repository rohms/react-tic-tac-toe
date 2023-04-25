import PropTypes from "prop-types";

const Square = ({ onClick, value }) => {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
};

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export { Square };
