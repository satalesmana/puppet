interface FormInput {
  scraping_account: String;
  initial_id: String;
  biller_id: String;
  initial_page: String;
  counter: String;
  status: String;
}

interface ListTable {
  data: Array<[]>;
  pagination: Object;
}

interface ScrapingAccoung {
  label: String;
  value: String;
}

interface State {
  formInput: FormInput;
  listTable: ListTable;
  optScrapingAccount: Array<ScrapingAccoung>;
  optPosition: Array<any>;
}

export default function (): State {
  return {
    formInput: {
      scraping_account: '',
      initial_id: '',
      biller_id: '',
      initial_page: '',
      counter: '',
      status: 'open',
    },
    listTable: {
      data: [],
      pagination: {},
    },
    optScrapingAccount: [],
    optPosition: [],
  };
}
