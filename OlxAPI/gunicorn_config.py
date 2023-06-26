import multiprocessing

bind = "127.0.0.1:7000"  # Change the IP address and port as needed
workers = multiprocessing.cpu_count() * 2 + 1
