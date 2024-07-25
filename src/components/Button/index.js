import './styles.css';

const Button = ({ text, type = 'default', className,...restProps}) => {
	return <button className={`btn ${type} ${className}`} {...restProps}>{text}</button>
} 

export default Button;