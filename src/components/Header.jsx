import PropTypes from "prop-types";

const Header = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className={`font-poppins text-[1.8rem] font-bold`}>{title}</h1>
      <p className={`font-poppins text-[0.85rem] text-dark-gray`}>{subtitle}</p>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Header;
