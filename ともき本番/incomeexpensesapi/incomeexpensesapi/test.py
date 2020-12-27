class Answer(models.Model):
       question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name='answer')
       answer = models.CharField(max_length=1,
                                 choices=ANSWER_CHOICES,
                                 null=True,
                                 blank=True)

class AnswerSerializer(serializers.ModelSerializer):
       question = serializers.PrimaryKeyRelatedField(many=False, queryset=Question.objects.all())

       class Meta:
           model = Answer
           fields = (
               'id',
               'answer',
               'question',
           )

class AnswerViewSet(ModelViewSet):
       queryset = Answer.objects.all()
       serializer_class = AnswerSerializer
       filter_fields = ('question', 'answer',)

def create(self, validated_data):
       answer, created = Answer.objects.update_or_create(
           question=validated_data.get('question', None),
           defaults={'answer': validated_data.get('answer', None)})
       return answer