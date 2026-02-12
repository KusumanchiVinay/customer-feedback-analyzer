from pydantic import BaseModel

class FeedbackModel(BaseModel):
    name: str | None = None
    product: str
    rating: int
    feedback: str
