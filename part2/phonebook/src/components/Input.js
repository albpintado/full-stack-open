const Input = ({ name, onChange, value, placeholder }) => {
    return (
    <>
      <label htmlFor={name}>Name </label>
      <input
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      />
    </>
  )
}
;

export default Input;
