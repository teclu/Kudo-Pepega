import React from "../../../_snowpack/pkg/react.js";
import {Card} from "../../../_snowpack/pkg/antd.js";
import ContentContainer from "../../shared/components/content-container/index.js";
import ReactMarkdown from "../../../_snowpack/pkg/react-markdown.js";
const About = () => {
  const content = `## What is Kudo Pepega?

It is a free alternative to [Kudoboard](https://www.kudoboard.com/) that relies on the user's own Google [Forms](https://www.google.com/forms/about/) and [Sheets](https://www.google.com/sheets/about/) to power the boards. Ultimately:

- All data will be managed and stored in the user's own Google Account.
- Kudo Pepega does not store any data (and hence not incur any costs to store such data).
- Should users want to take down their boards, all they have to do is revoke public access to the spreadsheets that are being used for their boards.

## Why was it made?

After seeing how Kudoboard works and its [pricing options](https://www.kudoboard.com/#pricing), I felt that it was overpriced. Knowing that some of my friends were actually spending money on it for celebratory occasions just did not sit well with me.

So this made me think: why not I try making an alternative so that my friends don't have to waste their money anymore?

## Any Feedback?

First, check out the [issues page](https://github.com/teclu/Kudo-Pepega/issues) to see if there are any existing ones already. If not, then feel free to [create a new issue](https://github.com/teclu/Kudo-Pepega/issues/new) and assign an appropriate label.

## Contributing

Right now, contributions are closed as this is more of a personal project that I would like to work on myself. If you would like, you can always fork or clone this repository and do whatever you want with the code base as long as you abide by the [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.
`;
  return /* @__PURE__ */ React.createElement(ContentContainer, null, /* @__PURE__ */ React.createElement(Card, {
    title: "About"
  }, /* @__PURE__ */ React.createElement(ReactMarkdown, {
    children: content
  })));
};
export default About;
