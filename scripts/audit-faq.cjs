require("ts-node/register/transpile-only");

const { SITE_COPY } = require("../src/lib/copy/therafoxWebsite");

const errors = [];

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const checkFaq = (label, section) => {
  if (!section?.faqItems || !Array.isArray(section.faqItems) || section.faqItems.length === 0) {
    errors.push(`${label}.faqItems must be a non empty array`);
    return;
  }
  if (!isNonEmptyString(section.faqTitle)) {
    errors.push(`${label}.faqTitle is required`);
  }
  section.faqItems.forEach((item, index) => {
    if (!isNonEmptyString(item?.question)) {
      errors.push(`${label}.faqItems[${index}].question is required`);
    }
    if (!isNonEmptyString(item?.answer)) {
      errors.push(`${label}.faqItems[${index}].answer is required`);
    }
  });
};

checkFaq("therapy", SITE_COPY.therapy);
checkFaq("contact", SITE_COPY.contact);

if (errors.length > 0) {
  console.error("FAQ audit failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("FAQ audit passed.");
