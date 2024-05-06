FROM devopsfaith/krakend:2.0.5
COPY symmetric.json .
COPY krakend.json /etc/krakend/krakend.json