// services/xmlToJson.js
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseAttributeValue: true,
});

export const xmlToJson = (xmlString) => {
  try {
    return parser.parse(xmlString);
  } catch (error) {
    console.error('Error parsing XML:', error);
    return null;
  }
};
