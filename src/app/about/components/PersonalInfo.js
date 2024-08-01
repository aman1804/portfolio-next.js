import React from 'react'
import Image from "next/image";
import { getData } from '../../../../lib/apiServices';

const PersonalInfo = async() => {
    const data = await getData('/api/personal-info');
    const personalInfo = data.personalInfo
    // console.log(data.personalInfo)
  return (
    <>
      <div className="col-lg-12">
        
        <div className="card card-style1  bg-black border-0">
          <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
            <div className="row  align-items-center">
            <span className="fw-semibold text-white-50">ABOUT</span>
            <span className="fs-4 fw-bolder text-white">LEARN MORE ABOUT ME</span>
              <div className="col-lg-4 mb-4 mb-lg-0">
              <Image src={"/profileImage.jpg"} width={250} height={300} alt='profile' />
              </div>
              <div className="col-lg-8 px-xl-10 text-white-50">
                <div className="row">
                  <h3 className="h2 text-custom-green">{`${personalInfo.first_name} ${personalInfo.last_name}`}</h3>
                  <p>
                    {personalInfo.bio}
                </p>
                <div className="col">
                <ul className="list-unstyled mb-1-9">
                    <li className='mb-2'><i className="bi bi-chevron-right text-custom-green">
                        </i> <strong className='text-white'>Birthday:</strong> <span>{personalInfo.birthday}</span>
                    </li>
                    <li className='mb-2'><i className="bi bi-chevron-right text-custom-green">
                        </i> <strong className='text-white'>Website:</strong> <span>{personalInfo.website}</span>
                    </li>
                    <li className='mb-2'><i className="bi bi-chevron-right text-custom-green">
                        </i> <strong className='text-white'>Phone:</strong> <span>{personalInfo.phone}</span>
                    </li>
                    <li className='mb-2'><i className="bi bi-chevron-right text-custom-green">
                        </i> <strong className='text-white'>Email:</strong> <span>example@abc.com</span>
                    </li>
                    <li className='mb-2'><i className="bi bi-chevron-right text-custom-green">
                        </i> <strong className='text-white'>Address:</strong> <span>{personalInfo.address}</span>
                    </li>
                </ul>
                </div>
                </div>
                
                {/* <ul className="list-unstyled mb-1-9 text-white-50">
                <li><i className="bi bi-chevron-right text-custom-green"></i> <strong className='text-white'>Birthday:</strong> <span>1 May 1995</span></li>
                  <li className="mb-2 mb-xl-3 display-28">
                    <span className="display-26 text-secondary me-2 font-weight-600">
                      Position:
                    </span>
                    
                    Coach
                  </li>
                  <li className="mb-2 mb-xl-3 display-28">
                    <span className="display-26 text-secondary me-2 font-weight-600">
                      Experience:
                    </span>
                    
                    10 Years
                  </li>
                  <li className="mb-2 mb-xl-3 display-28">
                    <span className="display-26 text-secondary me-2 font-weight-600">
                      Email:
                    </span>
                    
                    edith@mail.com
                  </li>
                  <li className="mb-2 mb-xl-3 display-28">
                    <span className="display-26 text-secondary me-2 font-weight-600">
                      Website:
                    </span>
                    
                    www.example.com
                  </li>
                  <li className="display-28">
                    <span className="display-26 text-secondary me-2 font-weight-600">
                      Phone:
                    </span>
                    
                    507 - 541 - 4567
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col-lg-12 mb-4 mb-sm-5">
        <div>
          <span className="section-title text-primary mb-3 mb-sm-4">
            About Me
          </span>
          <p>
            Edith is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <p className="mb-0">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed.
          </p>
        </div>
      </div> */}
    </>
  )
}

export default PersonalInfo
