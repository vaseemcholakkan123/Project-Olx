import './noData.css'
import noData from './nothing-here.webp'

function NoData() {
  return (
    <div className='d-flex w-100 justify-content-center a-center f-coloumn mt-3 pt-3'>
        <img src={noData} width={200} height={200} alt=""  />
        <h6 className="f-medium">No Data Found...</h6>
    </div>
  )
}

export default NoData