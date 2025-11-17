-- Insert Branch data
INSERT INTO branch (id, name, address) VALUES (1, 'Stellenbosch Techno Park', '5 Neutron Road, Stellenbosch');
INSERT INTO branch (id, name, address) VALUES (2, 'Cape Town V&A Waterfront', 'Dock Rd, Cape Town');
INSERT INTO branch (id, name, address) VALUES (3, 'Sandton City Mall', 'Rivonia Rd, Sandton');

-- Simulate available time slots for Branch 1 (Stellenbosch) on 2025-11-20
-- Slot 1: 10:00 - 10:30 (Available)
INSERT INTO slot (id, branch_id, start_time, end_time, is_booked) VALUES (101, 1, '2025-11-20 10:00:00', '2025-11-20 10:30:00', FALSE);
-- Slot 2: 10:30 - 11:00 (Available)
INSERT INTO slot (id, branch_id, start_time, end_time, is_booked) VALUES (102, 1, '2025-11-20 10:30:00', '2025-11-20 11:00:00', FALSE);
-- Slot 3: 11:00 - 11:30 (ALREADY BOOKED - for testing availability filtering)
INSERT INTO slot (id, branch_id, start_time, end_time, is_booked) VALUES (103, 1, '2025-11-20 11:00:00', '2025-11-20 11:30:00', TRUE);

-- Simulate available time slots for Branch 2 (Cape Town) on 2025-11-20
-- Slot 4: 14:00 - 14:30 (Available)
INSERT INTO slot (id, branch_id, start_time, end_time, is_booked) VALUES (201, 2, '2025-11-20 14:00:00', '2025-11-20 14:30:00', FALSE);
-- Slot 5: 14:30 - 15:00 (Available)
INSERT INTO slot (id, branch_id, start_time, end_time, is_booked) VALUES (202, 2, '2025-11-20 14:30:00', '2025-11-20 15:00:00', FALSE);
