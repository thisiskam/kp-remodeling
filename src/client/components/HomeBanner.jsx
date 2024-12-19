

export default function HomeBanner() {

  return (
    <>
      <div class="jumbotron jumbotron-fluid jumbotron-background">
        <div className='h-100 mb-5 p-0 w-100'>
          <div className='row mt-3'>
            <div className='col-12 px-4 mt-2 d-flex justify-content-end'>
            </div>
            <div className='col-1 d-flex justify-content-center'>
            </div>
          </div>
          <div className='row h-100'>
            <div class="col-1"></div>
            <div className='col-8 d-flex justify-content-center flex-column mb-5'>
              <img src='white-logo.png' className='col-md-8'></img>
            </div>
            <div className='col-2'>
              {/* spacing only */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


