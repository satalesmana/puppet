interface FormFilter {
  scraping_account: String;
  task_status: String;
  task: String;
}

interface ListTable {
  data: Array<[]>;
  pagination: Object;
}

interface ScrapingAccoung {
  label: String;
  value: String;
}

interface TaskList {
  label: String;
  value: String;
}

interface State {
  formFilter: FormFilter;
  listTable: ListTable;
  optScrapingAccount: Array<ScrapingAccoung>;
  optStatus: Array<any>;
  optTask: Array<TaskList>;
}

export default function (): State {
  return {
    formFilter: {
      scraping_account: '',
      task_status: '',
      task: '',
    },
    listTable: {
      data: [],
      pagination: {},
    },
    optScrapingAccount: [],
    optStatus: [
      { label: 'Open', value: 'open' },
      { label: 'In Progress', value: 'in progress' },
      { label: 'Done', value: 'done' },
      { label: 'Failed', value: 'failed' },
    ],
    optTask: [],
  };
}
