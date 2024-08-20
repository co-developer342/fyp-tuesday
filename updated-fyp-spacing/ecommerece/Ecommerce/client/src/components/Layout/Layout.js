import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';
import NavBar from '../../ui/components/navBar';
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
    <Helmet>
    <meta charset="UTF-8"/>
  <meta name="description" content={description}/>
  <meta name="keywords" content={keywords}/>
  <meta name="author" content={author}/>
  <title>{title}</title>
 
            </Helmet>
      {/* <Header/> */}
      <NavBar/>
      <main style={{minHeight:'90vh'}}>
      <Toaster />
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout


Layout.defaultProps={
  title:  "Ecommerce App - shope now",
  description:  "mern stack project",
  Keywords:  "mern,react,node,mongodb",
  author:   "Techinfovt",
}