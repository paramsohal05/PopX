

const InputField = ({
  label,
  type = "text",
  className = "",
  placeholder,
  required = false,
  ...props
}) => {
  return (
    <div
      className="relative w-full flex flex-col gap-2 border border-gray-600 p-2 
    rounded-l-xl border-l-gray-950"
    >
      {/* label */}
      <label
        htmlFor={label}
        className="text-sm absolute -top-2 left-3 bg-white px-1 text-blue-600 font-medium mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* input */}
      <input
        type={type}
        id={label}
        required={required}
        placeholder={placeholder}
        className={`outline-none placeholder:text-sm placeholder:text-gray-500 w-full
       text-blue-900 font-semibold placeholder:font-normal text-sm group`}
        {...props}
      />
    </div>
  );
};

export default InputField;
