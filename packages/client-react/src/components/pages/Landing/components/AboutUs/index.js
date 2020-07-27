import React from 'react';

const Container = props => {
  const { children } = props;
  return (
    <div id="about-us" className="p-12 bg-black text-white">
      {children}
    </div>
  );
};

const Copyright = () => {
  return (
    <p className="text-white text-center">
      © 2020 PiggyBank - HCMUS. All rights reserved.
    </p>
  );
};

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-row justify-between">{children}</div>;
};

const AboutUsParagraph = () => {
  return (
    <div className="max-w-xl">
      <div className="text-3xl pb-6">about us</div>
      <p className="text-xl font-light pb-6">
        We are a group of people, thriving for the next banking experience to
        our customers, aiming to create a fast, modern and convenient Internet
        Banking. Our mission is having every single one able to access and use
        bank instead of cash, especially during the pandemic time of COVID-19.
      </p>
    </div>
  );
};

const BranchesInfo = () => {
  return (
    <div className="pr-6">
      <div className="text-2xl pb-6 pt-6">PiggyBANK</div>
      <div className="flex flex-row">
        <div>
          227 Nguyen Van Cu, District 5, HCMC
          <br />
          Phone: 0282223222 Fax: 0282223223
          <br />
          Email: support@piggybank.com
        </div>
        <div className="pl-6">
          12 Nguyen Trai, District 1, HCMC
          <br />
          Phone: 0282223224 Fax: 0282223225
          <br />
          Email: support@piggybank.com
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <Container>
      <ContentContainer>
        <AboutUsParagraph />
        <BranchesInfo />
      </ContentContainer>
      <Copyright />
    </Container>
  );
};

export default AboutUs;
