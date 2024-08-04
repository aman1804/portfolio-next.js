import React from 'react'
import Image from "next/image";
import { getData } from '../../../../lib/apiServices';
import { formatDateToYYYYMMDD } from '@/app/admin/helpers/formatDate';

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
              <div className="col-md-4 mb-4 mb-lg-0 text-center text-md-start">
              <Image src={"/profileImage.jpg"} width={250} height={300} alt='profile' />
              </div>
              <div className="col-md-8 px-xl-10 text-white-50">
                <div className="row">
                  <h3 className="h2 text-custom-green">{`${personalInfo.first_name} ${personalInfo.last_name}`}</h3>
                  <p>
                    {personalInfo.bio}
                </p>
                <div className="col">
                <ul className="list-unstyled mb-1-9">
                    <li className='mb-2'><i className="bi bi-chevron-right text-custom-green">
                        </i> <strong className='text-white'>Birthday:</strong> <span>{ formatDateToYYYYMMDD(personalInfo.birthday)}</span>
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
                
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </>
  )
}

export default PersonalInfo
