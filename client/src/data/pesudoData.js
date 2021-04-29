export const schoolExamples = [
  { url: 'http://www.charlottesecondary.org/', ncessch: '1221763800065630210' },
  { url: 'http://www.kippcharlotte.org/', ncessch: '1223532959313072128' },
  { url: 'http://www.socratesacademy.us/', ncessch: '1232324303569510400' },
  { url: 'https://ggcs.cyberschool.com/', ncessch: '1226732686900957185' },
  { url: 'http://www.emmajewelcharter.com/pages/Emma_Jewel_Charter', ncessch: '1225558292157620224' },
]

export const largerSchoolExamples = [
	{ url: 'http://099.clayton.k12.ga.us/', ncessch: '130123003896' },
	{ url: 'http://198.clayton.k12.ga.us/', ncessch: '130123003687' },
	{ url: 'http://21stcenturypa.com/wp/', ncessch: '350006000811' },
	{ url: 'http://42charterschool.org/', ncessch: '220019300944' },
	{ url: 'http://a3school.org/', ncessch: '411167001641' },
	{ url: 'http://aaechighschools.com/', ncessch: '40010601892' },
	{ url: 'http://aaiutah.org/', ncessch: '490018601483' },
	{ url: 'http://aak8.org/', ncessch: '80345001896' },
	{ url: 'http://ablecharter.net/', ncessch: '62703013064' },
	{ url: 'http://abs.aasd.k12.wi.us/', ncessch: '550039002880' },
	{ url: 'http://aca.vail.k12.az.us/', ncessch: '40885001510' },
	{ url: 'http://acabroadway.com/', ncessch: '390143005665' },
]

export const tableHeader = [
	{id: 'ticket', label: "Ticket Details", minWidth: 200, align: 'left'},
	{id: 'creator', label: "Creator", minWidth: 120, align: 'right'},
	{id: 'date', label: "Date", minWidth: 120, align: 'right'},
	{id: 'priority', label: "Priority", minWidth: 100, align: 'right'},
	{id: 'more', label: " ", minWidth: 40, align: 'left'}
];

export const DatasetDetailHeader = [
	{id: 'text', label: "Text", minWidth: 200, align: 'left'},
	{id: 'school_id', label: "School ID", minWidth: 120, align: 'right'},
	{id: 'url', label: "URL", minWidth: 120, align: 'right'},
	{id: 'depth', label: "Depth", minWidth: 100, align: 'right'},
	{id: 'more', label: " ", minWidth: 40, align: 'left'}
];

function createJobData(id, ticket, creator, date, priority) {
	var rank;
	if (priority == 'HIGH') {
		rank = 3;
	} else if (priority == 'NORMAL') {
		rank = 2;
	} else if (priority == 'LOW') {
		rank = 1;
	}
	return { id, ticket, creator, date, priority, rank };
}

export const pesudoJobs = [
	createJobData(1, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "HIGH"),
	createJobData(2, "Chapter School Dataset", "Pranav Bhasin", "Feb 24, 2020", "NORMAL"),
	createJobData(3, "Chapter School Dataset", "Pranav Bhasin", "Feb 25, 2020", "LOW"),
	createJobData(4, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "HIGH"),
	createJobData(5, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "HIGH"),
	createJobData(6, "Chapter School Dataset", "Pranav Bhasin", "Feb 25, 2020", "LOW"),
	createJobData(7, "Chapter School Dataset", "Pranav Bhasin", "Feb 26, 2020", "HIGH"),
	createJobData(8, "Chapter School Dataset", "Pranav Bhasin", "Feb 27, 2020", "LOW"),
	createJobData(9, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "HIGH"),
	createJobData(10, "Chapter School Dataset", "Pranav Bhasin", "Feb 27, 2020", "HIGH"),
	createJobData(11, "Chapter School Dataset", "Pranav Bhasin", "Feb 26, 2020", "LOW"),
	createJobData(12, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "NORMAL"),
	createJobData(13, "Chapter School Dataset", "Pranav Bhasin", "Feb 27, 2020", "LOW"),
	createJobData(14, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "NORMAL"),
	createJobData(15, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "HIGH"),
	createJobData(16, "Chapter School Dataset", "Pranav Bhasin", "Feb 27, 2020", "LOW"),
	createJobData(17, "Chapter School Dataset", "Pranav Bhasin", "Feb 24, 2020", "HIGH"),
	createJobData(18, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "LOW"),
	createJobData(19, "Chapter School Dataset", "Pranav Bhasin", "Feb 26, 2020", "HIGH"),
	createJobData(20, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "NORMAL"),
	createJobData(21, "Chapter School Dataset", "Pranav Bhasin", "Feb 24, 2020", "NORMAL"),
	createJobData(22, "Chapter School Dataset", "Pranav Bhasin", "Feb 25, 2020", "HIGH"),
	createJobData(23, "Chapter School Dataset", "Pranav Bhasin", "Feb 26, 2020", "LOW"),
	createJobData(24, "Chapter School Dataset", "Pranav Bhasin", "Feb 28, 2020", "NORMAL"),
]

export const pesudoDatasetDetails = [
	{
		id: 1,
		spyder_num: 4,
		images_found: 233,
		datasets: [
			{
				school_id: 130123003896,
				text: "ABLE Charter Schools at Humphreys University",
				url: "http://099.clayton.k12.ga.us/",
				depth: 4,
			},
			{
				school_id: 130123003687,
				text: "ABLE Charter Schools at Humphreys University",
				url: "http://198.clayton.k12.ga.us/",
				depth: 4,
			},
			{
				school_id: 350006000811,
				text: "ABLE Charter Schools at Humphreys University",
				url: "http://21stcenturypa.com/wp/",
				depth: 4,
			},
		],
	},

	{
		id: 2,
		spyder_num: 9,
		images_found: 8817,
		datasets: [
			{
				school_id: 220019300944,
				text: "ABLE Charter Schools at Humphreys University",
				url: "http://42charterschool.org/",
				depth: 4,
			},
			{
				school_id: 411167001641,
				text: "ABLE Charter Schools at Humphreys University",
				url: "http://a3school.org/",
				depth: 4,
			},
		],
	},
]

function createUrlData(time, amount) {
	return { time, amount };
}

export const urlAmount = [
	createUrlData('03/23', 700),
	createUrlData('03/30', 900),
	createUrlData('04/06', 600),
	createUrlData('04/13', 1500),
	createUrlData('04/20', 1200),
	createUrlData('04/27', 2000),
	createUrlData('05/04', 400),
	createUrlData('05/11', 750),
	createUrlData('05/18', 1000),
];

export const progressData = [
	{
		status: 'Progress',
		Completed: "300",
		Incompleted: "900",
	},
]