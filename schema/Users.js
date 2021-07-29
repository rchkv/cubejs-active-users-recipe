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
    
    dauToMau: {
      title: `DAU to MAU`,
      sql: `100.000 * ${dailyActiveUsers} / NULLIF(${monthlyActiveUsers}, 0)`,
      type: `number`,
      format: `percent`,
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
