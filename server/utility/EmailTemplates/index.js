import { emailHead } from "./emailHead.js";
import { emailLogo } from "./emailLogo.js";
import { emailHero } from "./emailHero.js";
import { emailFooter } from "./emailFooter.js";

const Index = (
    headTitle,
    preheader,
    hero,
    emailBody,
    action
) => `<!DOCTYPE html>
<html>
<head>

  ${emailHead(headTitle)}

</head>
<body style="background-color: #e9ecef;">

  <!-- start preheader -->
  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    ${preheader}
  </div>
  <!-- end preheader -->

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    <!-- start logo -->
    ${emailLogo}
    <!-- end logo -->

    <!-- start hero -->
    ${emailHero(hero)}
    <!-- end hero -->

    <!-- start copy block -->
    ${emailBody}
    <!-- end copy block -->

    <!-- start footer -->
    ${emailFooter(action)}
    <!-- end footer -->

  </table>
  <!-- end body -->

</body>
</html>`;

export default Index;
