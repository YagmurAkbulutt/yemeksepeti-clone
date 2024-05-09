//HOC higher order components
// farklı componentları prop olarak alır

const Container = ({children}) => {
  return (
    <div className="max-w-[1200px] mx-auto p-5">{children}</div>
  )
}

export default Container