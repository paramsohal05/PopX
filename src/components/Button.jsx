
const Button = ({title, handleLogout}) => {
  return (
    <button type='submit' onClick={handleLogout}
    className='bg-blue-900 py-2 text-center rounded-md text-white 
    px-4 w-full hover:bg-blue-900/80 cursor-pointer'
    >
      {title}
    </button>
  )
}

export default Button