

const Submit = (props) => {
  return (
    <input type="submit" value={props.value} disabled={props.diabled} style={{ cursor: 'pointer' }} />
  )
}

export {
  Submit
}