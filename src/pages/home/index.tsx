import React from 'react';

/*
 * Temporary Home Page while things are being worked on.
 */
const InformationSection = (props: {
  title: string | JSX.Element;
  description: string | JSX.Element;
}): JSX.Element => {
  return (
    <>
      <h1>{props.title}</h1>
      <div>{props.description}</div>
      <br />
    </>
  );
};

const Home = (): JSX.Element => {
  return (
    <>
      <InformationSection
        title="What is Kudo Pepega?"
        description={
          <p>
            Kudo Pepega is a free alternative to{' '}
            <a href="https://www.kudoboard.com/">Kudoboard</a> that is currently
            in development.
          </p>
        }
      />
      <InformationSection
        title="Why are you doing this?"
        description={
          <>
            <p>
              After seeing how Kudoboard works and its{' '}
              <a href="https://www.kudoboard.com/#pricing">pricing options</a>,
              I honestly feel that it's overpriced. Seeing some of my friends
              actually spending money on it for celebratory occasions just did
              not sit well with me.
            </p>
            <p>
              So this made me think: why not I try making an alternative so that
              my friends don't have to waste their money anymore?
            </p>
          </>
        }
      />
      <InformationSection
        title="How will the boards work?"
        description={
          <>
            <p>
              Ideally, boards made with Kudo Pepega would function and behave
              similarly to Kudoboard.
            </p>
            <p>
              The key technical difference would be that Kudo Pepega would be
              relying on Google{' '}
              <a href="https://www.google.com/forms/about/">Forms</a> and{' '}
              <a href="https://www.google.com/sheets/about/">Sheets</a> to power
              the boards. This would mean that:
            </p>
            <ul>
              <li>
                All data will be managed and stored in the user's own Google
                Account.
              </li>
              <li>
                Kudo Pepega will not be storing any data (
                <i>and hence not incur any costs to store such data</i>).
              </li>
              <li>
                Should users want to take down their boards, all they have to do
                is revoke public access to the Google Forms and Sheets that are
                being used for those boards.
              </li>
            </ul>
          </>
        }
      />
    </>
  );
};

export default Home;
