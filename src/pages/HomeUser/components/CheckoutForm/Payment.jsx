import React, {useEffect, useState} from 'react'
import axios from '../../../../utils/axios';
import {useSelector} from 'react-redux'

import Review from './Review'


function Payment() {
  return (
    <div>
        Payment Form 
        <Review/>
    </div>
  )
}

export default Payment