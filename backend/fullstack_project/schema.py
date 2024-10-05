import graphene
from graphene_django import DjangoObjectType
from main_app.models import SampleModel

class SampleModelType(DjangoObjectType):
    class Meta:
        model = SampleModel
        fields = ("id", "name")

class Query(graphene.ObjectType):
    all_samples = graphene.List(SampleModelType)

    def resolve_all_samples(self, info):
        return SampleModel.objects.all()

class CreateSample(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    sample = graphene.Field(SampleModelType)

    @classmethod
    def mutate(cls, root, info, name):
        sample = SampleModel(name=name)
        sample.save()
        return CreateSample(sample=sample)

class Mutation(graphene.ObjectType):
    create_sample = CreateSample.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)