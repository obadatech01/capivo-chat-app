import React from 'react'
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <div className={styles.center}>
        <img src={"images/404.png"} alt="page not found" />
      </div>
      <div className={styles.center}>
        <Link to={"/"} className={styles.link}>Back to Home</Link>
      </div>
    </>
  )
}

export default NotFoundPage;