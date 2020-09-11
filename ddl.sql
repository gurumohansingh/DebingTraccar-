ALTER TABLE tc_users
  ADD speedunit varchar(20)
    AFTER poilayer,
  ADD temperatureunit varchar(20) 
    AFTER speedunit;