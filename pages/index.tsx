import Head from 'next/head'
import Layout from '../components/layout'
import Contacts from '../components/contacts'
import Careers from '../components/careers'
import Qualifications from '../components/qualifications'
import Activities from '../components/activities'
import OldActivities from '../components/oldActivities'
import Developments from '../components/developments'
import Summary from '../components/summary'
import { getContentsData } from '../lib/contents'
import React, { useEffect } from "react";

export async function getStaticProps() {
  const contactsData = getContentsData('contacts')
  const careersData = getContentsData('careers')
  const qualificationsData = getContentsData('qualifications')
  const activitiesData = getContentsData('activities')
  const oldActivitiesData = getContentsData('oldActivities')
  const developmentsData = getContentsData('developments')
  const summaryData = getContentsData('summary')
  return {
    props: {
      contactsData,
      careersData,
      qualificationsData,
      activitiesData,
      oldActivitiesData,
      developmentsData,
      summaryData
    }
  }
}

export default function Home({ contactsData, careersData, qualificationsData, activitiesData, oldActivitiesData, developmentsData, summaryData }) {
  useEffect(() => {
    window.location.href = 'https://scrapbox.io/a-know/a-know_%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6'
  })
  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="a-know／いのうえ のポートフォリオページ兼ポータルページ。自己紹介も兼ねています。" />
        <meta name="author" content="a-know／いのうえ" />
        <title>a-know-home | a-know's Resume / Portfolio page</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="assets/images/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="assets/images/apple-touch-icon-114x114.png" />
        <link href="https://fonts.googleapis.com/css?family=Suranna" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" type="text/css" />
      </Head>

      <main>
        <div className="show-menu-btn">
          <img src="/img/icon_big.png" alt="my icon" className="img-shadow" />
        </div>
        <div className="wrapper">
          <section className="split-image parallax">
            <div className="split-image-footer">
              <ul className="split-list">
                <li>2008-08-24 岡山県笠岡市カブト南町の笠岡湾干拓地にて撮影</li>
              </ul>
            </div>
          </section>
          <section className="split-content">
            <section className="module">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-sm-12">
                    <h1>ID : a-know 's Portfolio site</h1>
                    <p>だれかの助けになるようなことに自分の経験を活かしていきたいし、『インターネットの一部となるようなものをつくること』もずっとつづけていきたい。</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="module">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-sm-3">
                    <h6>Summary</h6>
                  </div>
                  <Summary summaryData={summaryData} />
                </div>
              </div>
            </section>
            <hr />
            <section className="module">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-sm-3">
                    <h6>Contact by...</h6>
                  </div>
                  <Contacts contactsData={contactsData} />
                </div>
              </div>
            </section>
            <section className="module">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-sm-3">
                    <h6>Employment and Education</h6>
                  </div>
                  <Careers careersData={careersData} />
                </div>
              </div>
            </section>
            <section className="module">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-sm-3">
                    <h6>Possession Qualification</h6>
                  </div>
                  <Qualifications qualificationsData={qualificationsData} />
                </div>
              </div>
            </section>
            <section className="module">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-sm-3">
                    <h6>Activities and Achievements</h6>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-sm-12">
                        <ul className="service-list">
                          <Activities activitiesData={activitiesData} />
                          <OldActivities oldActivitiesData={oldActivitiesData} />
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="module">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-sm-3">
                    <h6>Hobby Development</h6>
                  </div>
                  <Developments developmentsData={developmentsData} />
                </div>
              </div>
            </section>
            <footer className="footer">
              <div className="container-fluid container-custom">
                <div className="row">
                  <div className="col-md-7">
                    <p>© 2016 a-know. All rights reserved</p>
                  </div>
                  <div className="col-md-5">
                    <ul className="social-list">
                      <li><a href="https://twitter.com/#!/a_know" target="_blank"><i className="fa fa-twitter-square"></i></a></li>
                      <li><a href="https://github.com/a-know" target="_blank"><i className="fa fa-github-alt"></i></a></li>
                      <li><a href="https://blog.a-know.me/" target="_blank"><i className="fa fa-rss-square"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </div>
      </main>
    </Layout>
  )
}
