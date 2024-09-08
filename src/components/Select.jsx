import React, {useId} from "react";

function Select({
    options,
    label,
    clasName,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
          {label && <label htmlFor={id} className=""></label>} 
          <select
          {...props}
          id={id}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
          focus:bg-gray-50 duration-200 border border-ggray-200 w-full
          ${clasName}`}>
            //by default ek array kyuki problem ho skti hai
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
            </select> 
        </div>
    )
}

export default React.forwardRef(Select);