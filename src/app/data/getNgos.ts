import * as cheerio from "cheerio";

export type Ngo = {
    registrationNumber: string;
    type: string;
    name: string;
    phone: string;
    email: string;
    officialAddress: string;
    district: string;
    province: string;
    country: string;
    contactPerson: string;
    status: string;
};

const districtMappings = {
    ampara: "Eastern",
    anuradhapura: "North Central",
    badulla: "Uva",
    batticaloa: "Eastern",
    colombo: "Western",
    galle: "Southern",
    gampaha: "Western",
    hambantota: "Southern",
    jaffna: "Northern",
    kalutara: "Western",
    kandy: "Central",
    kegalle: "Sabaragamuwa",
    kilinochchi: "Northern",
    kurunegala: "North Western",
    mannar: "Northern",
    matale: "Central",
    matara: "Southern",
    moneragala: "Uva",
    mullaitivu: "Northern",
    nuwara: "Eliya Central",
    polonnaruwa: "North Central",
    puttalam: "North Western",
    ratnapura: "Sabaragamuwa",
    trincomalee: "Eastern",
    vavuniya: "Northern"
};

const districtMap = new Map(Object.entries(districtMappings));

export async function getNgos(): Promise<Ngo[]> {
    const response = await fetch("http://www.ngosecretariat.gov.lk/index.php?option=com_ngo&view=registeredlist&layout=national_list&Itemid=146&lang=en#");
    const html = await response.text();

    const $ = cheerio.load(html);

    const organisations = $("table")
        .find("tr.accordion-toggle")
        .map((_, row) => {
            const tds = $(row).find("td");

            const regNumber = $(tds[1]).text();

            return {
                registrationNumber: $(tds[1]).text(),
                type: $(tds[2]).text(),
                name: $(tds[3]).text(),
                phone: $(tds[4]).text(),
                email: $(tds[5]).text().trim()
            };
        })
        .get();

    const extraInfo = $("table")
        .find("td.hiddenRow")
        .map((index, element) => {
            const matchingOrg = organisations[index];

            const infoDivs = $(element).find("div.col-lg-5");

            const addressInfoDivs = $(infoDivs[0]).find("div.col-lg-7");
            const contactPersonInfoDivs = $(infoDivs[1]).find("div.col-lg-7");

            const officialAddress = $(addressInfoDivs[0]).text().trim();

            const district = officialAddress.split(",").pop()!;

            // remove white space and any full stops.
            // Also remove the numbers for Colombo district
            const trimmedDistrict = district.trim().replace(/\.$/, "").split(" ")[0];

            const province = districtMap.get(trimmedDistrict.toLowerCase());

            return {
                ...matchingOrg,
                officialAddress: $(addressInfoDivs[0]).text().trim(),
                district: trimmedDistrict,
                province: province,
                country: $(addressInfoDivs[1]).text().trim(),
                contactPerson: $(contactPersonInfoDivs[0]).text().trim(),
                status: $(contactPersonInfoDivs[1]).text().trim()
            } as Ngo;
        })
        .get();

    return extraInfo;
}
