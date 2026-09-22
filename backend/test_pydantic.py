from pydantic import BaseModel, Field
import json

class MyModel(BaseModel):
    id: str = Field(alias="_id")
    name: str

m = MyModel(**{"_id": "123", "name": "test"})
print("dump:", m.model_dump())
print("dump_json:", m.model_dump_json())
print("dump by alias:", m.model_dump(by_alias=True))
