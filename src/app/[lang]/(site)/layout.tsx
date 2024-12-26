interface props {
  children : React.ReactNode
}
const layout = ({children} : props) => {
  return (
    <div className="">
      {children}
    </div>
  )
}

export default layout
