cube(`Users`, {
  sql: `SELECT * FROM public.users`,

  // start part: usersSchema
  measures: {
    monthlyActiveUsers: {
      sql: `id`,
      type: `countDistinct`,
      rollingWindow: {
        trailing: `30 day`,
        offset: `start`,
      },
    },

    weeklyActiveUsers: {
      sql: `id`,
      type: `countDistinct`,
      rollingWindow: {
        trailing: `7 day`,
        offset: `start`,
      },
    },

    dailyActiveUsers: {
      sql: `id`,
      type: `countDistinct`,
      rollingWindow: {
        trailing: `1 day`,
        offset: `start`,
      },
    },
    
    wauToMau: {
      title: `WAU to MAU`,
      sql: `100.000 * ${weeklyActiveUsers} / NULLIF(${monthlyActiveUsers}, 0)`,
      type: `number`,
      format: `percent`,
    },
  },
  
  // end part: usersSchema
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },

    createdAt: {
      sql: `created_at`,
      type: `time`
    }
  },
});
