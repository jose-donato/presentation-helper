export default function Checkbox({ label, checked,...rest }) {
  return (
    <label className="flex items-start justify-start cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-2 bg-white border-2 border-gray-400 rounded focus-within:border-blue-500 mb-1">
        <input type="checkbox" {...rest} className="absolute opacity-0" />
        {
          !checked ? (
            <svg
              className="w-4 h-4 text-blue-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M20 12H4" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-blue-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )
        }
      </div>
      <div className="select-none">{label}</div>
    </label>
  );
}