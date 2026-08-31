const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  return (
    <>
      { notification ? (
          <div style={style} data-testid="notification">
            {notification}
          </div>
        ) : null
      }
    </>
  )
}

export default Notification
