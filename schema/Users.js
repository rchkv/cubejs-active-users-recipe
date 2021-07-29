cube(`Users`, {
  sql: `SELECT * FROM public.users`,

  measures: {
    monthlyActiveUsers: {
      sql: `last_name`,
      type: `countDistinct`,
      rollingWindow: {
        trailing: `30 day`,
        offset: `start`,
      },
    },

    weeklyActiveUsers: {
      sql: `last_name`,
      type: `countDistinct`,
      rollingWindow: {
        trailing: `7 day`,
        offset: `start`,
      },
    },

    dailyActiveUsers: {
      sql: `last_name`,
      type: `countDistinct`,
      rollingWindow: {
        trailing: `1 day`,
        offset: `start`,
      },
    },
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    lastname: {
      sql: `last_name`,
      type: `string`
    },

    createdAt: {
      sql: `created_at`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
